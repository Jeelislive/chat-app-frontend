import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import { React, useState } from 'react'
import { sampleUsers } from '../../constants/SampleData'
import UserItem from "../shared/UserItem" 
import { useAsyncMutation, useErrors } from '../../hooks/hooks'
import { useAddGroupMemberMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducers/misc'

const AddMemberDialog = ({ chatId }) => {

    const dispatch = useDispatch();
    const {isAddMember} = useSelector((state) => state.misc);
    const [addMember, isLoadingaddMember] = useAsyncMutation(useAddGroupMemberMutation);

    const {isLoading, data, isError, error} = useAvailableFriendsQuery(chatId);

    const [ selectedMembers, setselectedMembers ] = useState([])

    const selectMemberHandler = (id) => {
        setselectedMembers((prev) => (prev.includes(id) ?
            prev.filter((currentElement) => currentElement !== id)
            : [ ...prev, id ]))
    }

    const AddMemberSuubmitHandler = () => { 
        addMember("Adding Member", {chatId, members: selectedMembers});
        closeHandler();
     }

    const closeHandler = () => {
        dispatch(setIsAddMember(false));
    }

    useErrors([{isError, error}]);

  return (
      <Dialog open={isAddMember} onClose={closeHandler}>
          <Stack p={"2rem"} width={"20  rem"} spacing={"2rem"} >
              <DialogTitle textAlign={"center"}>
                  Add Member
              </DialogTitle>
              <Stack spacing={"1rem"}>
                  { isLoading ? <Skeleton/> : 
                      data?.friends?.length > 0 ?
                      data?.friends?.map((i) => (
                          <UserItem 
                                key={i._id}
                                user={i}
                              handler={ selectMemberHandler }
                                isAdded={ selectedMembers.includes(i._id) }
                            />
                      )) : <Typography textAlign={"center"}>
                            No Friends
                        </Typography>
                  }
              </Stack>
              <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}> 
                  <Button onClick={closeHandler}  color='error'>Cancel</Button>
                  <Button onClick={ AddMemberSuubmitHandler} variant="contained" disabled={isLoadingaddMember}>Submit Changes</Button>
             </Stack>
          </Stack>
   </Dialog>
  ) 
}

export default AddMemberDialog 