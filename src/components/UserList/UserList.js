import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { favoriteService } from "services/favoriteService";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(favoriteService.getFavorites())
  }, [])


  useEffect(() => {
    if(!filterCountries.length) setFilteredUsers([...users]);
    else{
      setFilteredUsers(users.filter(user=>filterCountries.some(country=>country===user.location.country)))
    }
  }, [filterCountries,users])

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleCheckboxClicked = (value) => {
    if(filterCountries.find(country=>country===value)) setFilterCountries(state=>state.filter(country=>country!==value))
    else setFilterCountries([...filterCountries,value])
  }

  const getIsChecked = (country) => {
    filterCountries.some(country=>country===country)
  }

  const toggleFavorite = (user) => {
    setFavorites(favoriteService.toggleFavorite(user))
  }

  



  return (
    <S.UserList>
      <S.Filters>
        <CheckBox onChange={handleCheckboxClicked} value="Brazil" label="Brazil" isChecked={getIsChecked('Brazil')} />
        <CheckBox onChange={handleCheckboxClicked} value="Australia" label="Australia" isChecked={getIsChecked('Australia')} />
        <CheckBox onChange={handleCheckboxClicked} value="Canada" label="Canada" isChecked={getIsChecked('Canada')} />
        <CheckBox onChange={handleCheckboxClicked} value="Germany" label="Germany" isChecked={getIsChecked('Germany')} />
        <CheckBox onChange={handleCheckboxClicked} value="France" label="France" isChecked={getIsChecked('France')} />
      </S.Filters>
      <S.List>
        {filteredUsers.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId || favorites.some(favoriteUser=>favoriteUser.cell===user.cell)}>
                <IconButton
                  onClick={()=>{toggleFavorite(user)}}
                >
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
