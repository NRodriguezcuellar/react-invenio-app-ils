import { documentApi, patronApi } from '@api';
import {
  serializeDocument,
  serializePatron,
} from '@modules/ESSelector/serializer';
import { invenioConfig } from '@config';
import {
  ArrayField,
  BooleanField,
  DeleteActionButton,
  GroupField,
  PriceField,
  SelectorField,
  StringField,
  TextField,
  VocabularyField,
} from '@forms';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

export class OrderLines extends Component {
  renderArrayItem = ({ arrayPath, indexPath, ...arrayHelpers }) => {
    const { currencies } = this.props;
    return (
      <Segment raised>
        <GroupField
          border
          grouped
          widths="equal"
          action={
            <DeleteActionButton
              size="large"
              onClick={() => arrayHelpers.remove(indexPath)}
            />
          }
        >
          <GroupField widths="equal">
            <PriceField
              label="Order Line Unit Price"
              fieldPath={`${arrayPath}.${indexPath}.unit_price`}
              currencies={currencies}
              defaultCurrency={invenioConfig.defaultCurrency}
            />
            <PriceField
              label="Order Line Total Price"
              fieldPath={`${arrayPath}.${indexPath}.total_price`}
              currencies={currencies}
              defaultCurrency={invenioConfig.defaultCurrency}
            />
          </GroupField>

          <SelectorField
            required
            emptyHeader="No document selected"
            emptyDescription="Please select a document."
            fieldPath={`${arrayPath}.${indexPath}.document`}
            errorPath={`${arrayPath}.${indexPath}.document_pid`}
            label="Document"
            placeholder="Search for a document..."
            query={documentApi.list}
            serializer={serializeDocument}
          />
          <GroupField widths="equal">
            <VocabularyField
              type={invenioConfig.vocabularies.acqOrders.acq_recipient}
              fieldPath={`${arrayPath}.${indexPath}.recipient`}
              label="Recipient"
              placeholder="Select recipient..."
              required
            />

            <StringField
              label="ID for inter-departmental transaction"
              fieldPath={`${arrayPath}.${indexPath}.inter_departmental_transaction_id`}
            />
          </GroupField>

          <GroupField widths="equal">
            <StringField
              label="Copies Ordered"
              type="number"
              fieldPath={`${arrayPath}.${indexPath}.copies_ordered`}
              required
            />
            <StringField
              label="Copies Received"
              type="number"
              fieldPath={`${arrayPath}.${indexPath}.copies_received`}
            />
            <VocabularyField
              type={invenioConfig.vocabularies.acqOrders.acq_medium}
              fieldPath={`${arrayPath}.${indexPath}.medium`}
              label="Medium"
              placeholder="Select medium..."
              required
            />
          </GroupField>

          <GroupField widths="equal">
            <BooleanField
              label="Donation"
              fieldPath={`${arrayPath}.${indexPath}.is_donation`}
              toggle
            />
            <BooleanField
              label="Patron Suggestion"
              fieldPath={`${arrayPath}.${indexPath}.is_patron_suggestion`}
              toggle
            />
          </GroupField>
          <SelectorField
            emptyHeader="No patron selected"
            emptyDescription="Please select a patron."
            fieldPath={`${arrayPath}.${indexPath}.patron`}
            errorPath={`${arrayPath}.${indexPath}.patron_pid`}
            label="Patron"
            placeholder="Search for a patron..."
            query={patronApi.list}
            serializer={serializePatron}
          />

          <GroupField widths="equal">
            <VocabularyField
              type={
                invenioConfig.vocabularies.acqOrders.acq_order_line_payment_mode
              }
              fieldPath={`${arrayPath}.${indexPath}.payment_mode`}
              label="Payment mode"
              placeholder="Select payment mode..."
            />
            <VocabularyField
              type={
                invenioConfig.vocabularies.acqOrders
                  .acq_order_line_purchase_type
              }
              fieldPath={`${arrayPath}.${indexPath}.purchase_type`}
              label="Purchase Type"
              placeholder="Select purchase type..."
            />
            <StringField
              label="Budget code"
              fieldPath={`${arrayPath}.${indexPath}.budget_code`}
            />
          </GroupField>

          <TextField
            label="Notes"
            fieldPath={`${arrayPath}.${indexPath}.notes`}
            rows={3}
          />
        </GroupField>
      </Segment>
    );
  };

  render() {
    return (
      <ArrayField
        fieldPath="resolved_order_lines"
        defaultNewValue={{
          unit_price: { currency: invenioConfig.defaultCurrency },
          total_price: { currency: invenioConfig.defaultCurrency },
        }}
        renderArrayItem={this.renderArrayItem}
        addButtonLabel="Add new order line"
      />
    );
  }
}

OrderLines.propTypes = {
  currencies: PropTypes.array.isRequired,
};
