import * as React from "react";
import withBreadcrumbs, { BreadcrumbsProps } from "react-router-breadcrumbs-hoc";
import { NavLink, match as IMatch } from "react-router-dom";

const userNamesById: { [index: string]: string  } = {
    1: "John"
};

const DynamicUserBreadcrumb = ({ match }: {match: IMatch<{ userId: string }>}) => (
    <span>{userNamesById[match.params.userId]}</span>
);

const routes = [
    { path: "/users/:userId", breadcrumb: DynamicUserBreadcrumb },
    { path: "/example", breadcrumb: "Custom Example" },
];

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: BreadcrumbsProps[] }) => (
    <div>
        {breadcrumbs.map(({ match, breadcrumb }) => (
            <span key={match.url}>
                <NavLink to={match.url}>{breadcrumb}</NavLink>
            </span>
        ))}
    </div>
);

export default withBreadcrumbs(routes)(Breadcrumbs);
