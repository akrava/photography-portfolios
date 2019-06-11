import React from "react";
import { connect } from "react-redux";
import { WithStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IApplicationStore } from "@configs/configureReduxStore";
import { getAll, IPhotoState, PhotoThunkDispatch } from "@actions/photo";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const styles = ({ palette }: Theme) => createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
});

interface IPhotosProps {
    photos: IPhotoState;
    getAll: (limit: number, offset: number) => void;
}

class Photos extends React.Component<IPhotosProps & WithStyles<typeof styles>> {
    static mapStateToProps(store: IApplicationStore) {
        return { photos: store.photos };
    }

    static mapDispatchToProps(dispatch: PhotoThunkDispatch) {
        return {
            getAll: (limit: number, offset: number) =>
                dispatch(getAll(limit, offset))
        };
    }

    componentDidMount() {
        this.props.getAll(10, 0);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
                    <ListSubheader component="div">December</ListSubheader>
                </GridListTile>
                {this.props.photos.photoArray && this.props.photos.photoArray.map((tile) => (
                    <GridListTile key={tile.url}>
                        <img src={tile.url} alt={tile.name} />
                        <GridListTileBar
                            title={tile.name}
                            subtitle={<span>by: {tile.description}</span>}
                            actionIcon={
                            <IconButton aria-label={`info about ${tile.name}`} className={classes.icon}>
                                <InfoIcon />
                            </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
                </GridList>
            </div>
        );
    }
}

export default connect(Photos.mapStateToProps, Photos.mapDispatchToProps)
    (withStyles(styles)(Photos));
