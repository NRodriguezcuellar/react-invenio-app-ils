import { Pagination } from '@components/Pagination';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Container, Grid, Input, Item } from 'semantic-ui-react';

export default class LoansList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenPageSize: null,
    };
  }

  renderPagination = () => {
    const {
      activePage,
      rowsPerPage,
      isLoading,
      onPageChange,
      loans,
      setManualPageSize,
    } = this.props;
    const { chosenPageSize } = this.state;

    return setManualPageSize ? (
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Pagination
              currentPage={activePage}
              currentSize={rowsPerPage}
              loading={isLoading}
              onPageChange={onPageChange}
              totalResults={loans.total}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Input
              placeholder="Items per page"
              type="number"
              className="default-margin"
              defaultValue={rowsPerPage}
              size="mini"
              onChange={(e, data) =>
                this.setState({ chosenPageSize: parseInt(data.value) })
              }
            />
            <Button
              size="mini"
              onClick={() => setManualPageSize(chosenPageSize)}
            >
              Apply
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      <Pagination
        currentPage={activePage}
        currentSize={rowsPerPage}
        loading={isLoading}
        onPageChange={onPageChange}
        totalResults={loans.total}
      />
    );
  };

  render() {
    const { loans, renderListEntry, noLoansCmp } = this.props;

    return loans.total > 0 ? (
      <>
        <Container textAlign="center">{this.renderPagination()}</Container>
        <Item.Group divided>
          {loans.hits.map((loan) => (
            <React.Fragment key={loan.metadata.pid}>
              {renderListEntry(loan)}
            </React.Fragment>
          ))}
        </Item.Group>
      </>
    ) : (
      noLoansCmp
    );
  }
}

LoansList.propTypes = {
  activePage: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loans: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  renderListEntry: PropTypes.func.isRequired,
  noLoansCmp: PropTypes.element.isRequired,
  setManualPageSize: PropTypes.func,
};
