import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
    list: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "10px",
        gridAutoRows: 'minMax(100px, auto)'
    },
    paper: {
        margin: "30px",
        width: "350px"
    },
    button: {
        height: "20px",
        width: "40px"
    },
    cleaningPaper : {
        backgroundColor: "#E1E5EA"
    },
    cleanerModal: {
        width: "500px"
    },
    exitButton: {
        maxWidth: "30px",
        maxHeight: "30px",
        minWidth: "30px",
        minHeight: "30px"
    },
    fireCleaner: {
        height: "20px",
        width: "35px"
    },
    cleanerCard: {
        margin: "15px"
    }
}));