import React, { useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { favoriteService } from "services/favoriteService";

const Favorites = () => {

  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    setFavorites(favoriteService.getFavorites())
  }, [])



  
  const toggleFavorite = (user) => {
    setFavorites(favoriteService.toggleFavorite(user))
  }

  return (
    <S.Favorite>

      <S.Header>
        <Text size="64px" bold>
          Favorites
        </Text>
      </S.Header>

      <S.List>
        {favorites.map((user, index) => {
          return (
            <S.User
              key={index}
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
              <S.IconButtonWrapper isVisible={true}>
                <IconButton
                  onClick={() => { toggleFavorite(user) }}
                >
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
      </S.List>
    </S.Favorite>
  );
};

export default Favorites;
