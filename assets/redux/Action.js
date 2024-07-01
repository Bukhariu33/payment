import {UPDATE_DATA} from '../../assets/redux/UpdateData'

export const updateData = (data) => ({
  type: UPDATE_DATA,
  payload: data,
});
