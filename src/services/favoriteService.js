import { storageService } from "./storageService";

var favorites = storageService.loadFromStorage('favorites')? storageService.loadFromStorage('favorites'):[];

function getFavorites() {
    return [...favorites]
}

function toggleFavorite(user) {
    if (favorites.some(favoriteUser => favoriteUser.cell === user.cell)) { //need to be id but have some users without id
        favorites = favorites.filter(favoriteUser => favoriteUser.cell !== user.cell)
    } else {
        favorites = [...favorites, user]
    }

    storageService.saveToStorage('favorites',favorites);
    return favorites
}

export const favoriteService = {
    getFavorites,
    toggleFavorite
}