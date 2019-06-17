import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { IPhotoObject } from "@actions/photo";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

interface IPhotoCardsProps {
    cols: number;
    cellHeight: number;
    images: IPhotoObject[];
    goToPage: (link: string) => void;
}

class PhotoCards extends React.Component<IPhotoCardsProps> {
    handleLoadImage(ref: React.RefObject<HTMLDivElement>) {
        if (ref.current) {
            ref.current.classList.add("photo-card__loading-splash_disabled");
        }
    }

    renderCard = ( x: IPhotoObject, i: number) => {
        const { goToPage } = this.props;
        const { handleLoadImage } = this;
        const refDivLoading = React.createRef<HTMLDivElement>();
        const url = `/photos/${x.uniqueNum}`;
        return(
            <GridListTile key={i} className="photo-card">
                <img
                    src={x.url}
                    alt={x.name}
                    onLoad={() => handleLoadImage(refDivLoading)}
                />
                <GridListTileBar
                    className="photo-card__title"
                    title={<Link className="link photo-card__link" to={url}>{x.name}</Link>}
                    subtitle={<span>by: {x.description}</span>}
                    actionIcon={
                        <div className="photo-card__icon">
                            <IconButton
                                aria-label={`info about ${name}`}
                                color="inherit"
                                onClick={() => goToPage(url)}
                            >
                                <InfoIcon />
                            </IconButton>
                        </div>
                    }
                />
                <div ref={refDivLoading} className="photo-card__loading-splash">
                    <CircularProgress />
                </div>
            </GridListTile>
        );
    }

    render() {
        const { cols, cellHeight, images } = this.props;
        const { renderCard } = this;
        return (
            <GridList className="photos__grid" cols={cols} cellHeight={cellHeight}>
                {images.map((x, i) => renderCard(x, i))}
            </GridList>
        );
    }
}

export default PhotoCards;
