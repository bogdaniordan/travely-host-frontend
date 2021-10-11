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
        height: "650px",
        margin: "auto"
    },
    register: {
        borderRadius: "25px",
        position: "absolute",
        width: "600px",
        height: "700px",
        margin: "auto"
    },
    updateContainer: {
        height: "100%",
        margin: "auto"
    },
    updatePaper: {
        margin: "auto",
        height: "900px"
    },
    updateBtn: {
        float: "left"
    },
    backBtn: {
        float: "right"
    },
    addPaper: {
        margin: "auto",
        height: "1100px"
    },
    addForm: {
        width: "80%",
        margin: "auto"
    },
    addContainer: {
        height: "100%",
        margin: "auto"
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
    }
}));