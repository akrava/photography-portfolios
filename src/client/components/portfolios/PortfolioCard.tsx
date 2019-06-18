import React from "react";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { IUserObject} from "@actions/user";

interface IPortfolioCardProps {
    portfolio: IUserObject;
}

class PortfolioCard extends React.Component<IPortfolioCardProps> {
    render() {
        const { avaUrl, fullname, category, login } = this.props.portfolio;
        return (
            <Link className="link" to={`/portfolio/${login}`}>
                <Card className="order-card">
                    <Avatar src={avaUrl} />
                    <div className="order-card__actions">
                        <p><b>{fullname}</b></p>
                        <p>Category: <br/><i>{category}</i></p>
                    </div>
                </Card>
            </Link>
        );
    }
}

export default PortfolioCard;
