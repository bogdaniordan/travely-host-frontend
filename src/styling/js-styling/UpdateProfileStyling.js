import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    updateDetailsPaper: {
        // height: "800px",
        margin: "auto",
        textAlign: "left",
        width: "80%",
        overflow: "auto",
        marginBottom: "150px"
    },
    updateDetailsContainer: {
        margin: "auto",
        marginBottom: "100px"
    },
    submit: {
        float: "left",
        marginLeft: "15px"
    },
    back: {
        float: "right"
    },
    profilePicture: {
        fontWeight: "bold"
    }
}));