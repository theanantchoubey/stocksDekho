import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACVElEQVR4nO2VP2/TUBTFHwtiIBNLu5YJpMR/Sud0bMlAPgE0iW2xde3G0g2p1DYMKFJRy4CUIj4AyXNiHMdpuiDgC8SJnx1vqUBqUaSHnomrKCQBVBE74v2ks3k45957ngGgUCixpCn5mabodS3J7Vgi2gSLhlXw/KbUw03JxQ0J2WBRUNfKtxReOzAeOTjSAOQELNF1/vQEMMDXFBY+VHnNV/kqPlo/vagXnH5DdDsNCW2AedMUPBRO8EPe/qay2rbMa6vE6Pi38iq8rXDae2KcSOGr+guudmfupi8NpWqcseUMwgB6zsYKpwWSWegqLHzzLvP5uSWgXr3Q7R+uty5UjpjXfLKFSSHnZ56rbigsPDtKn2Ij55ybguMd3/+oEtOB+WGQ0RvXSUBWOyD3D6JEZWBOZuB3hSWT1kqv0tUb49/s3SuvkCmbOfQ1DFAXun6k7/CwgLvE+E/B3d+dQUv0Ny3J61iia/+Tkp6Ivc5oCfeTlW05+WsJn9wtXZdZ+DqYOqMNVK7yGMSBk5EAta02lhkYaJ+puDITltDrGbnu+WG6RaZ+Ru4fxIXWcMUNAaG3mU9P5VTlpZyC7SAIC8dK2B6QJxIsAnvJ8sqzoITOZQlNyUFg0WiFGxJRNH/KuJJF2MwijCfpAcIGiDvZKeZDgbiTpQH+9w0sFW1zuWjjSVoq2kbsAyxPMR+KBoh6A2t6f6ayVz2hm/mSmcgf4ykyYh8gMd18IBpApxu44gntfJmp+HdghwbAdAOzoCdUpCXG9BVK0GfUju5HRqFQKBTwF/wA9S0vpDtIUP4AAAAASUVORK5CYII="></img>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
