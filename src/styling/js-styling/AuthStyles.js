import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    container: {
        borderRadius: "25px",
        position: "absolute",
        width: "550px",
        // minHeight: "600px",
        margin: "auto",
        overflow: "auto"
    },
    register: {
        borderRadius: "25px",
        position: "absolute",
        width: "600px",
        overflow: "auto",
        margin: "auto"
    },
    updateContainer: {
        height: "100%",
        margin: "auto",
        marginBottom: "100px"
    },
    updatePaper: {
        margin: "auto",
        overflow: "auto"
    },
    updateBtn: {
        float: "left"
    },
    backBtn: {
        float: "right"
    },
    addPaper: {
        margin: "auto",
        overflow: "auto"
    },
    addForm: {
        width: "80%",
        margin: "auto"
    },
    addContainer: {
        height: "100%",
        margin: "auto",
        marginBottom: "100px"
    },
    checkBtn: {
        display: "none"
    },
    bookingAvatar: {
        height: "70px",
        width: "70px",
        margin: "auto"
    },
    cardActions : {
        justifyContent: "center"
    },
    registerContainer: {
        marginBottom: "100px"
    },
    submitBtn: {
        margin: "10px",
    },
    loginContainer : {
        marginBottom: "80px"
    }
}));