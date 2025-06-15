import React, { useEffect, useState } from 'react'
import { Container, Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, CircularProgress, Alert, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { User, UserRole } from '../types/index'

export default function AdminDashboard(){
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  useEffect(()=>{
    const unsub = onSnapshot(collection(db,'users'), 
      (snap) => {
        const arr:User[]=[]
        snap.forEach(d=>arr.push(d.data() as User))
        setUsers(arr)
        setLoading(false)
      },
      (err) => {
        console.error("AdminDashboard users snapshot error:", err)
        setError("Не удалось загрузить список пользователей. Проверьте права доступа в Firestore.")
        setLoading(false)
      }
    )
    return () => unsub()
  },[])

  const handleRoleChange = async (uid:string,newRole:UserRole)=>{
    const userRef = doc(db, 'users', uid);
    try {
        await updateDoc(userRef, { role: newRole });
        // Local state will be updated by the onSnapshot listener
    } catch (error) {
        console.error("Error updating role: ", error);
        setError("Не удалось обновить роль. Попробуйте снова.");
    }
  }

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
  };

  const handleCloseDialog = () => {
      setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
        await deleteDoc(doc(db, 'users', userToDelete.id));
        console.warn(`User document for ${userToDelete.email} (UID: ${userToDelete.id}) was deleted from Firestore. You must delete the user from the Firebase Authentication panel manually to prevent them from logging in again.`);
        handleCloseDialog();
        // Local state will be updated by the onSnapshot listener
    } catch (error) {
        console.error("Error deleting user: ", error);
        setError("Не удалось удалить пользователя. Попробуйте снова.");
        handleCloseDialog();
    }
  };

  if (loading) {
    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        </Container>
    )
  }

  if (error) {
    return (
        <Container>
            <Alert severity="error" sx={{ mt: 4 }}>
                {error}
            </Alert>
        </Container>
    )
  }

  return (
    <Container>
      <Box sx={{ mt:4 }}>
        <Typography variant="h4" gutterBottom>Админ-панель</Typography>
        <Paper sx={{ p:2 }}>
          <Typography variant="h6" gutterBottom>Пользователи</Typography>
          {users.length === 0 && !loading ? (
            <Typography>Пользователи не найдены.</Typography>
          ) : (
            <Table>
              <TableHead>
                  <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>Имя</TableCell>
                      <TableCell>Роль</TableCell>
                      <TableCell>Действия</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {users.map(u=> (
                  <TableRow key={u.id}>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.displayName}</TableCell>
                    <TableCell>
                      <Select size="small" value={u.role} onChange={(e)=>handleRoleChange(u.id,e.target.value as UserRole)}>
                        <MenuItem value="student">student</MenuItem>
                        <MenuItem value="teacher">teacher</MenuItem>
                        <MenuItem value="admin">admin</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button color="error" size="small" onClick={() => handleDeleteClick(u)}>Удалить</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Box>

      <Dialog
          open={!!userToDelete}
          onClose={handleCloseDialog}
      >
          <DialogTitle>Подтвердите удаление</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  Вы уверены, что хотите удалить пользователя {userToDelete?.email}? Это действие необратимо. Документ пользователя будет удален из базы данных.
                  <br /><br />
                  <strong>Важно:</strong> для полного удаления необходимо также удалить этого пользователя из раздела Authentication в консоли Firebase.
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleCloseDialog}>Отмена</Button>
              <Button onClick={handleConfirmDelete} color="error">Удалить</Button>
          </DialogActions>
      </Dialog>
    </Container>
  )
} 