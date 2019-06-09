import React from "react";
import withBreadcrumbs, { BreadcrumbsRoute, InjectedProps } from "react-router-breadcrumbs-hoc";
import { Link, match as IMatch } from "react-router-dom";
import BreadcrumbsWrapper from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";

const userNamesById: { [index: string]: string  } = {
    1: "John"
};

const DynamicUserBreadcrumb = ({ match }: { match: IMatch<{ userId: string }> }) => (
    <span>{userNamesById[match.params.userId]}</span>
);

const routes: BreadcrumbsRoute[] = [
    { path: "/users/:userId", breadcrumb: DynamicUserBreadcrumb },
    { path: "/example", breadcrumb: "Custom Example" },
];

class Breadcrumbs extends React.Component<InjectedProps> {
    render() {
        const { breadcrumbs } = this.props;
        return (
            <BreadcrumbsWrapper className="breadcrumbs__wrapper" aria-label="Breadcrumb">
                {breadcrumbs.map(({ match, breadcrumb }, i) => {
                    if (i === 0) {
                        return (
                            <Link className="breadcrumbs__link" color="inherit" to="/">
                                <HomeIcon className="breadcrumbs__home-icon" />
                            </Link>
                        );
                    } else if (i === breadcrumbs.length - 1) {
                        return breadcrumb;
                    } else {
                        return (
                            <Link className="breadcrumbs__link" to={match.url}>
                                {breadcrumb}
                            </Link>
                        );
                    }
                })}
            </BreadcrumbsWrapper>
        );
    }
}

export default withBreadcrumbs<{}>(routes)(Breadcrumbs);
