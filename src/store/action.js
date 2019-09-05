/*
 * action type
 */

export const ActionTypes = {
  Switch_Page: 'Switch_Page'
}


/*
 * action creator
 */

export const Actions = {
  switchPage() {
    return {
      type: ActionTypes.Switch_Page
    };
  }
}
