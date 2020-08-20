import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { CloseRounded } from '@material-ui/icons';

import Support from 'components/support';

import styles from './styles';

function Policy(props) {
  const { classes, visible, onClose } = props;
  return <Dialog open={visible} onClose={onClose} >
    <DialogTitle>
      <Grid container spacing={2} alignItems="center" className={classes.noWrap}>
        <Grid item className={classes.stretch}>
          <Typography variant="h3">Privacy Policy of Thiêng Việt LLC</Typography>
        </Grid>
        <Grid item>
          <IconButton color="secondary" size="small" onClick={onClose}>
            <CloseRounded />
          </IconButton>
        </Grid>
      </Grid>
    </DialogTitle>
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Thiêng Việt LLC operates the <a href="https://thiengviet.com">https://thiengviet.com</a> website, which provides the SERVICE.</Typography>
          <Typography>This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service, the Thieng Viet website.</Typography>
          <Typography>If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</Typography>
          <Typography>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at <a href="https://thiengviet.com">https://thiengviet.com</a>, unless otherwise defined in this Privacy Policy. Our Privacy Policy was created with the help of the <a href="https://www.privacypolicytemplate.net">Privacy Policy Template</a> and the <a href="https://www.disclaimergenerator.org/">Disclaimer Generator</a>.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Information Collection and Use</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Log Data</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Cookies</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer’s hard drive.</Typography>
          <Typography>Our website uses these "cookies" to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.</Typography>
          <Typography>For more general information on cookies, please read <a href="https://www.cookieconsent.com/what-are-cookies/">"What Are Cookies"</a>.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Service Providers</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>We may employ third-party companies and individuals due to the following reasons:</Typography>
          <Typography>
            <ul>
              <li>To facilitate our Service;</li>
              <li>To provide the Service on our behalf;</li>
              <li>To perform Service-related services; or</li>
              <li>To assist us in analyzing how our Service is used.</li>
            </ul>
          </Typography>
          <Typography>We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Security</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Links to Other Sites</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Children's Privacy</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Changes to This Privacy Policy</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Contact Us</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.</Typography>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Support />
        </Grid>
      </Grid>
    </DialogActions>
  </Dialog>
}

export default withStyles(styles)(Policy);