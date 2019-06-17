import React from "react";
import Card from "@material-ui/core/Card";

interface IInformationCardProps {
    name: string;
    value: string;
}

class PhotoInformationCard extends React.Component<IInformationCardProps> {
    render() {
        const { name, value } = this.props;
        return (
            <Card className="information-card__wrapper-card">
                <div className="photo__information-card">
                    <div className="information-card__key">
                        {name}
                    </div>
                    <div className="information-card__value">
                        <div className="information-card__icon">
                            {this.props.children}
                        </div>
                        {value}
                    </div>
                </div>
            </Card>
        );
    }
}

export default PhotoInformationCard;
