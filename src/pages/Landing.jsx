import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button, Stack, Grid, Card, CardContent, Link, Divider, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import AttachmentIcon from '@mui/icons-material/Attachment';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import { BRAND } from '../constants/branding';

const Feature = ({ icon, title, desc }) => (
  <Card sx={{ height: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3 }}>
    <CardContent>
      <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
        <Box color="primary.main">{icon}</Box>
        <Typography variant="h6" fontWeight={700}>{title}</Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary">{desc}</Typography>
    </CardContent>
  </Card>
);

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen((v) => !v);

  return (
    <Box sx={{ bgcolor: '#0B0D0F', color: 'rgba(255,255,255,0.92)', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(10,12,14,0.7)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box sx={{ width: 34, height: 34, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: 'primary.main', color: '#0B0D0F' }}>
              <ChatIcon fontSize="small" />
            </Box>
            <Typography variant="h6" fontWeight={800}>{BRAND.name}</Typography>
          </Stack>

          {/* Desktop links */}
          <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link href="#features" underline="none" color="inherit" sx={{ px: 1.5 }}>Features</Link>
            <Link href="#preview" underline="none" color="inherit" sx={{ px: 1.5 }}>Preview</Link>
            <Link href="#contact" underline="none" color="inherit" sx={{ px: 1.5 }}>Contact</Link>
            <Button component={RouterLink} to="/login" variant="contained" size="small">Get Started</Button>
          </Stack>

          {/* Mobile hamburger */}
          <IconButton color="inherit" onClick={toggleMobile} sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleMobile} PaperProps={{ sx: { bgcolor: '#0D1013' } }}>
        <Box sx={{ width: 260 }} role="presentation" onClick={toggleMobile} onKeyDown={toggleMobile}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#features">
                <ListItemText primary="Features" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#preview">
                <ListItemText primary="Preview" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#contact">
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
          </List>
          <Box sx={{ p: 2 }}>
            <Button component={RouterLink} to="/login" fullWidth variant="contained">Get Started</Button>
          </Box>
        </Box>
      </Drawer>

      <Container maxWidth="lg">
        {/* Hero */}
        <Box component="section" sx={{ py: { xs: 6, md: 12 }, textAlign: 'center', px: { xs: 1, sm: 0 } }}>
          <Stack spacing={{ xs: 2, md: 3 }} alignItems="center">
            <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 2, fontSize: { xs: 10, sm: 12 } }}>{BRAND.tagline}</Typography>
            <Typography variant={{ xs: 'h4', md: 'h3' }} fontWeight={800}>{BRAND.subTagline}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, px: { xs: 1, md: 0 } }}>{BRAND.description}</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2, width: { xs: '100%', sm: 'auto' } }}>
              <Button component={RouterLink} to="/login" variant="contained" endIcon={<SendIcon />}>Get Started</Button>
              <Button href="#preview" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.2)' }}>See Live Preview</Button>
              <Button href="#features" variant="text" sx={{ color: 'rgba(255,255,255,0.8)' }}>Explore Features</Button>
            </Stack>
          </Stack>
        </Box>

        {/* Features */}
        <Box id="features" component="section" sx={{ py: { xs: 6, md: 10 } }}>
          <Typography variant="h5" fontWeight={800} align="center" gutterBottom>Everything you need to stay in sync</Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>Powerful, intuitive tools so your conversations flow without friction.</Typography>
          <Grid container spacing={{ xs: 1.5, md: 2 }}>
            <Grid item xs={12} sm={6} md={3}><Feature icon={<GroupsIcon />} title="Group Chat" desc="Organize teams, clubs, and communities in dynamic group conversations." /></Grid>
            <Grid item xs={12} sm={6} md={3}><Feature icon={<PersonIcon />} title="Personal DMs" desc="Have focused one‑to‑one chats with friends and collaborators." /></Grid>
            <Grid item xs={12} sm={6} md={3}><Feature icon={<AttachmentIcon />} title="Attachments" desc="Share images, documents, and media with drag‑and‑drop ease." /></Grid>
            <Grid item xs={12} sm={6} md={3}><Feature icon={<NotificationsActiveIcon />} title="Notifications" desc="Stay on top of mentions and replies with real‑time alerts." /></Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

        {/* Preview */}
        <Box id="preview" component="section" sx={{ py: { xs: 6, md: 10 } }}>
          <Typography variant="h5" fontWeight={800} gutterBottom>See {BRAND.name} in action</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>A quick look at the clean, focused interface.</Typography>
          <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', overflowX: 'auto' }}>
            <Typography variant="caption" color="text.secondary">Desktop view</Typography>
            <Box sx={{ mt: 1, p: 2, borderRadius: 2, bgcolor: '#0F1216', border: '1px solid rgba(255,255,255,0.06)', minWidth: { xs: 520, md: 'auto' } }}>
              <Typography variant="overline" color="text.secondary"># general</Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="text.secondary">Today</Typography>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">Alex • 10:24 AM</Typography>
                  <Typography variant="body2">Hey team, sharing the latest design updates now.</Typography>
                  <Typography variant="caption" color="text.secondary">design-spec.pdf • 2.3 MB</Typography>
                </Box>
                <Box sx={{ mt: 1.2 }}>
                  <Typography variant="caption" color="text.secondary">Jamie • 10:26 AM</Typography>
                  <Typography variant="body2">Looks great! Let's discuss in the 2pm standup.</Typography>
                </Box>
                <Box sx={{ mt: 1.2 }}>
                  <Typography variant="caption" color="text.secondary">Rika • 10:28 AM</Typography>
                  <Typography variant="body2">I'll add the copy updates after lunch.</Typography>
                </Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5 }}>
                  <Box sx={{ flex: 1, height: 36, borderRadius: 1, bgcolor: '#0B0D0F', border: '1px solid rgba(255,255,255,0.06)' }} />
                  <Button variant="contained" size="small" endIcon={<SendIcon />}>Send</Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box id="contact" component="footer" sx={{ py: 6, color: 'text.secondary' }}>
          <Stack spacing={1} alignItems="center">
            <Typography variant="caption">© 2025 {BRAND.name}. All rights reserved.</Typography>
            <Stack direction="row" spacing={2}>
              <Link href={`mailto:${BRAND.email}`} color="inherit">{BRAND.email}</Link>
              <Link href={BRAND.githubUrl} target="_blank" rel="noopener" color="inherit">GitHub</Link>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
