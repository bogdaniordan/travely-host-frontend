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
    },
    questionContainer: {
        maxWidth: "70%",
        textAlign: "center",
        minHeight: "700px"
    },
    backLink: {
        float: "left"
    },
    deleteQuestion: {
        marginLeft: "10px"
    },
    yesCancelButton: {
        marginRight: "5px",
        padding: "10px"
    },
    noCancelButton: {
        padding: "10px"
    },
    questionsIcon: {
        height: "150px !important",
        width: "150px !important"
    },
    answeredButton: {
        marginTop: "9px"
    },
    deleteForever: {
        width: "50px !important",
        height: "50px !important"
    }
}));