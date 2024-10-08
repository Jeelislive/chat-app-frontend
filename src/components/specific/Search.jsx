import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material';
import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/reducers/misc';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api';
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
      <Dialog open={isSearch} onClose={searchCloseHandler} fullWidth>
    <Stack
  p={2}
  direction="column"
  spacing={2}
  width="100%"
  sx={{
    '@media (max-width:600px)': {
      p: 4,
     }
  }}
>
  <DialogTitle textAlign="center">Find People</DialogTitle>
  <TextField
    label=""
    value={search.value}
    onChange={search.changeHandler}
    variant='outlined'
    size='small'
    fullWidth
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      )
    }}
  />
  <List>
    {users.map((i) => (
      <UserItem
        user={i}
        key={i._id}
        handler={addFriendHandler}
        handlerIsLoading={isLoadingSendFriendRequest}
      />
    ))}
  </List>
</Stack>

      </Dialog>
    )
  }

  export default Search;