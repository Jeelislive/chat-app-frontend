import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material';
import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/reducers/misc';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api';
import toast from 'react-hot-toast';
import { useAsyncMutation } from '../../hooks/hooks';

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const dispatch = useDispatch();
  const search = useInputValidation('');

  const [users, setUsers] = useState([]);

  const [sendRequest, isLoadingSendFriendRequest]  = useAsyncMutation(useSendFriendRequestMutation);

  const addFriendHandler = async (id) => {
      await sendRequest("Sending Friend Request", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

    return (
      <Dialog open={isSearch} onClose={searchCloseHandler}>
        <Stack p={ "2rem" } direction={ "column" } width={ "25rem" }>
          
          <DialogTitle textAlign={ "center" }>Find People</DialogTitle>
          <TextField
            label=""
            value={ search.value }
            onChange={ search.changeHandler }
            variant='outlined'
            size='small'
            InputProps={ {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />

          <List>
            {
              users.map((i) => (
              <UserItem user={i} key={i._id} handler={addFriendHandler} 
               handlerIsLoading={isLoadingSendFriendRequest} />
              ))
            }
          </List>

        </Stack>
      </Dialog>
    )
  }

  export default Search;