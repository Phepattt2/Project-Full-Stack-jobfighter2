import React, { useState } from "react";
import Box from '@mui/material/Box';
import { Grid } from "@mui/material";
import Typography from '@material-ui/core/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import logo from '../../assets/pics/Lovepik_com-401693242-office-girl.png';
import './Login.css';
import { ClassNames, useTheme } from "@emotion/react";
import { useMediaQuery } from 'react-responsive';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

//redux
import { useDispatch } from "react-redux";
import { signIn } from "../../api/auth";

// import { useSelector } from "react-redux";

const notosan1=createTheme({
  typography:{
    subtitle1:{
      fontSize:50,
      fontFamily: [
        'Noto Sans Thai',
        'sans-serif',
      ].join(','),
    },
    body1:{
      fontSize:30,
      fontFamily: [
        'Noto Sans Thai',
        'sans-serif',
      ].join(','),
    },
    body2:{
      fontSize:18,
      fontWeight:500,
      fontFamily: [
        'Noto Sans Thai',
        'sans-serif',
      ].join(','),
    }
  },
});

export default function Login(){
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  ////////////////////////
  // const { user } = useSelector((state) => ({ ...state }));
  ////////////////////////

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roleBaseRedirect = (role) => {
    console.log('roleBaseRedirect', role);
    if (role === "admin") {
      navigate("/admin/manage");
    } else if (role === 'student'){
      navigate("/homestudent");
    } else {
      navigate("/homecompany")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn(form).then((res) => {

        console.log(res.data);
        toast(res.data.payload.user.name + " Login Success");   // แจ้งเตือน alert
        roleBaseRedirect(res.data.payload.user.role);         // เช็คถ้าเป็น role ไหนให้ไปหน้านั้น โดยใช้ข้อมูลจาก res
        // redux
        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,    // ***
            id:   res.data.payload.user.id,
            user: res.data.payload.user.name,
            role: res.data.payload.user.role,
            
          },
        });
        
      localStorage.setItem("token", res.data.token);     // ***เก็บ token โดยใช้ข้อมูลจาก res
      

    })
    .catch((err) => {
        console.log('Login:',err.response.data);
        toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    return(
        // ลองใช้ mui
        <ThemeProvider theme={notosan1}>
        <Grid className="layout">

          <Grid className="image">
            <Box className="image"
            component={"img"}
            src={logo}
            sx={{
              mt:15
            }}
            />
          </Grid>

            {/* ฟอร์มแถบขาว */}
            <Grid className="form1">
            <Box className="box-form"
            sx={{
                width: 600,
                height: 450,
                my: 25,
                mx: 95,
                backgroundColor: 'white',
                // display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 20,
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px'
                
            }}>


            {/* จัดรูปแบบที่จะกรอก */}
            <Grid className="form" container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center">

                <Box id="form-write"  noValidate sx={{ mt: 1 ,width: 450,marginTop:5}}>
                <form onSubmit={handleSubmit}>
            <TextField className="e-mail"
              margin="normal"
              // ดอกจัน
              // required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              onChange={handleChange}
            />
            <TextField className="password"
              margin="normal"
              // ดอกจัน
              // required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ mt: 5}}
              variant="outlined"
              onChange={handleChange}
            />

            <Button id="button-login"
            style={{
                borderRadius: 20,
                backgroundColor: "#24AB82",
                padding: "10px 36px",
                fontSize: "18px"
            }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 ,color: 'white'}}
            >
            <Typography variant="body1">
            เข้าสู่ระบบ
            </Typography>
            </Button>


            {/* link 2 อันล่าง */}
            <Grid container justifyContent="flex-end" alignItems="flex-end">
              <Grid item >
                <Link href="/forgotpass" style={{fontSize: "18px",color: "black"}} variant="body2" underline="hover">
                  <Typography variant="body2">
                  ลืมรหัสผ่าน?    
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" alignItems="flex-end">
              <Grid item>
                <Link href="/signupstudent" style={{fontSize: "18px",color: "black"}} variant="body2" underline="hover">
                <Typography variant="body2">
                  ลงทะเบียนสำหรับผู้ใช้ใหม่    
                </Typography>
                </Link>
              </Grid>
            </Grid>
            </form>
          </Box>
          </Grid>
          </Box>
          
          {/* หัวข้อแถบเขียน */}
          <Box className="green-form"
            sx={{
                width: 600,
                height: 120,
                my: -96,
                mx: 95,
                backgroundColor : '#69F0AE',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                textAlign: 'center',
                // paddingTop: 0
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
            }}>
              
              <Typography variant="subtitle1">
              <Box sx={{ fontWeight: 800,textAlign:"center"}}>
             เข้าสู่ระบบ
              </Box>
              </Typography>
              
          </Box>
            
            
            
          </Grid> 
           
       
        </Grid>
        </ThemeProvider>
    );  
}