import {remove, render} from "../lib/render.js";
import {UpdateType, RankTypes} from "../lib/const.js";
import {appointUserRank} from "../lib/rank.js";

import ProfileView from "../view/profile.js";

export default class Profile {
  constructor(profileContainer, filmsModel) {
    this._profileContainer = profileContainer;
    this._filmsModel = filmsModel;
    this._isLoading = true;
    this._rank = RankTypes.ZERO;

    this._profileComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._renderProfile(this._rank);
  }

  _renderProfile(rank) {
    this._profileComponent = new ProfileView(rank);
    render(this._profileContainer, this._profileComponent);
  }

  _clearProfile() {
    remove(this._profileComponent);
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._updateProfile();
        break;
      case UpdateType.INIT:
        this._updateProfile();
        break;
    }
  }

  _updateProfile() {
    this._clearProfile();
    this._rank = appointUserRank(this._filmsModel.getFilms());
    this._renderProfile(this._rank);
  }
}
