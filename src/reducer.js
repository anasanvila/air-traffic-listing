const reducer = (store, action) => {
  let newStore = { ...store };

  switch(action.type){
    case 'IMPORT_IN_STORE':
      newStore.listing=action.amount;
      break;
    default : return newStore;
  }
  return newStore;
}

export default reducer;
