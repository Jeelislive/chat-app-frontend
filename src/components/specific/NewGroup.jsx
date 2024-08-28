import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import { Button, DialogTitle,  Skeleton,  Stack, TextField, Typography } from '@mui/material'
import { sampleUsers } from '../../constants/SampleData'
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hooks'
import { setIsNewGroup } from '../../redux/reducers/misc'
import { Group } from '@mui/icons-material'
import toast from 'react-hot-toast'

function NewGroup() {

  const {isNewGroup} = useSelector((state) => state.misc)
  const dispatch = useDispatch();
  const {isError, isLoading, error, data} = useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const [ selectedMembers, setselectedMembers ] = useState([])

  const errors = [{
    isError,
    error
  }]
  useErrors(errors);
  
  const selectMemberHandler = (id) => {
    
    setselectedMembers((prev) => (prev.includes(id) ?
    prev.filter((currentElement) => currentElement !== id)
    : [ ...prev, id ]))
  }

  const closeHandler = () => { 
    dispatch(setIsNewGroup(false));
  }

  const submitHandler = () => {
    if(!groupName.value){
      return toast.error("Group name is required");
    }

    if(selectedMembers.length < 2){
      return toast.error("Group should have atleast 3 members");
    }
    newGroup("Created New Group",{name: groupName.value, members: selectedMembers});
    closeHandler();
 }
  const groupName = useInputValidation("");

  return (
    <Dialog open= {isNewGroup} onClose={closeHandler}>
     <Stack
  p={{ xs: "1rem", sm: "3rem" }}
  spacing={{ xs: "1rem", sm: "2rem" }} // Adjust spacing for different screen sizes
  width="100%"
>
  <DialogTitle
    textAlign="center"
    variant="h4"
    sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
  >
    New Group
  </DialogTitle>

  <TextField
    label="Group Name"
    value={groupName.value}
    onChange={groupName.changeHandler}
    fullWidth
  />

  <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
    Members
  </Typography>

  <Stack>
    {isLoading ? (
      <Skeleton />
    ) : (
      data?.friends?.map((i) => (
        <UserItem
          user={i}
          key={i._id}
          handler={selectMemberHandler}
          isAdded={selectedMembers.includes(i._id)}
        />
      ))
    )}
  </Stack>

  <Stack direction="row" justifyContent="space-evenly">
    <Button variant="text" color="error" size="large" onClick={closeHandler}>
      Cancel
    </Button>
    <Button
      variant="contained"
      size="large"
      onClick={submitHandler}
      disabled={isLoadingNewGroup}
    >
      Create
    </Button>
  </Stack>
</Stack>

    </Dialog>
  )
}

export default NewGroup