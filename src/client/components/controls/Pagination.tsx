import * as React from "react";
import Typography from "@material-ui/core/Typography";
import PaginatorModule from "material-ui-flat-pagination";
import withWidth, { WithWidthProps } from "@material-ui/core/withWidth";

export interface IPaginationProps {
    total: number;
    offset: number;
    limit: number;
    cbPageChanged: (offset: number) => void;
    isDisabled: boolean;
    textDescription: string[];
}

class Pagination extends React.Component<IPaginationProps & WithWidthProps> {
    getText(total: number, offset: number, words: string[]) {
        return (total - offset === 1)
            ? ` ${words[0]} was`
            : ` ${words[1]} were`;
    }

    getSizePaginator = () => this.props.width === "xs" ? "medium" : "large";

    render() {
        const { getText, getSizePaginator } = this;
        const { offset, limit, total, isDisabled, cbPageChanged, textDescription } = this.props;
        const currentPage = offset / limit + 1;
        const size = getSizePaginator();
        if (total === 0) {
            return null;
        }
        return (
            <div className="pagination">
                <Typography
                    className="pagination__text"
                    variant="subtitle1"
                    align="center"
                    paragraph={true}
                >
                    {total - offset >= limit ? limit : total - offset}
                    {getText(total, offset, textDescription)} viewed on this page from
                    {` ${total}`} avaliable.<br/>
                    You are on {currentPage} page of {Math.ceil(this.props.total / limit)}.
                </Typography>
                <div className="pagination__pages-block">
                    {total > limit &&
                        <PaginatorModule
                            limit={limit}
                            offset={offset}
                            total={total}
                            onClick={(_e, _offset) => cbPageChanged(_offset)}
                            currentPageColor="default"
                            otherPageColor="secondary"
                            size={size}
                            outerButtonCount={size === "large" ?  2 : 1}
                            innerButtonCount={size === "large" ?  2 : 1}
                            disabled={isDisabled}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default withWidth({ withTheme: true })(Pagination);
