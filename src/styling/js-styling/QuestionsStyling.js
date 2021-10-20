import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
    paper: {
        width: "80%",
        margin: "auto",
        marginTop: "10px"
    },
    error: {
        height: "100px",
        width: "100px"
    }
}));