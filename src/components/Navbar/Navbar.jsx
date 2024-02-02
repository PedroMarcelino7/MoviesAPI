import styles from './Navbar.module.css'

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Favicon from '/favicon.png'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBaseDesktop = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const StyledInputBaseMobile = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: '1.5rem',
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handlePortfolioNavigate = () => {
        navigate('https://pedromarcelino7.github.io/Portfolio/')
    }

    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            if (!search) return

            navigate(`/search?q=${search}`)
            setSearch('')
        }
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [showSearchBar, setShowSearchBar] = useState(false)

    const handleShowSearchBar = () => {
        setShowSearchBar(!showSearchBar)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <NavLink
                            to={'https://pedromarcelino7.github.io/Portfolio/'}
                            className={styles.logo}
                        >
                            Portfolio
                        </NavLink>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleShowSearchBar}
                            color="inherit"
                        >
                            <SearchIcon />
                        </IconButton>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={() => handlePortfolioNavigate}
                    >
                        <NavLink
                            to={'https://pedromarcelino7.github.io/Portfolio/'}
                            className={styles.logo}
                        >
                            Portfolio
                        </NavLink>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

                    <Box sx={{
                        flexGrow: 0,
                        mr: 3,
                        display: {
                            xs: 'none',
                            sm: 'flex'
                        }
                    }}>
                        <Search onKeyUp={handleSubmit}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBaseDesktop
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </Search>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Home">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Link to='/'><Avatar alt="Home" src={Favicon} /></Link>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>

            {showSearchBar &&
                <Box
                    paddingInline='2rem'
                >
                    <Toolbar
                        disableGutters
                        sx={{
                            display: {
                                xs: 'flex',
                                sm: 'none'
                            }
                        }}
                    >
                        <Search
                            onKeyUp={handleSubmit}
                        >
                            <StyledInputBaseMobile
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </Search>
                    </Toolbar>
                </Box>
            }
        </AppBar>
    );
}
export default Navbar;