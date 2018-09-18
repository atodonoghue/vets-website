import React, { Component } from 'react';
import FacilityTypeDropdown from './FacilityTypeDropdown';
import recordEvent from '../../../platform/monitoring/record-event';
import {
  healthServices,
  benefitsServices,
  vetCenterServices
} from '../config';
import ServiceTypeAhead from './ServiceTypeAhead';

class SearchControls extends Component {
  handleEditSearch = () => {
    this.props.onChange({ active: false });
  }

  handleQueryChange = (e) => {
    this.props.onChange({ searchString: e.target.value });
  }

  handleFacilityTypeChange = (option) => {
    const facilityType = (option === 'all') ? null : option;
    this.props.onChange({ facilityType, serviceType: null });
  }

  handleServiceTypeChange = ({ target }) => {
    const option = target.value;
    const serviceType = (option === 'All') ? null : option;
    this.props.onChange({ serviceType });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { facilityType } = this.props.currentQuery;
    // Report event here to only send analytics event when a user clicks on the button
    recordEvent({
      event: 'fl-search',
      'fl-search-fac-type': facilityType
    });

    this.props.onSubmit();
  }

  renderServiceTypeDropdown = () => {
    const { facilityType, serviceType } = this.props.currentQuery;
    const disabled = !['health', 'benefits', 'vet_center', 'cc_provider'].includes(facilityType);
    let services;

    // Determine what service types to display for the facility type.
    switch (facilityType) {
      case 'health':
        services = healthServices;
        break;
      case 'benefits':
        services = benefitsServices;
        break;
      case 'vet_center':
        services = vetCenterServices.reduce((result, service) => {
          result[service] = service; // eslint-disable-line no-param-reassign
          return result;
        }, { All: 'Show all facilities' });
        break;
      case 'cc_provider':
        return <ServiceTypeAhead onSelect={this.handleServiceTypeChange}/>;
      default:
        services = {};
    }

    // Create option elements for each service type.
    const options = Object.keys(services).map((service) => (
      <option key={service} value={service}>
        {services[service]}
      </option>
    ));

    return (
      <span>
        <label htmlFor="service-type-dropdown">
          Service type (optional)
        </label>
        <select
          id="service-type-dropdown"
          disabled={disabled}
          value={serviceType || ''}
          onChange={this.handleServiceTypeChange}>
          {options}
        </select>
      </span>
    );
  }

  render() {
    const { currentQuery, isMobile } = this.props;

    if (currentQuery.active && isMobile) {
      return (
        <div className="search-controls-container">
          <button className="small-12" onClick={this.handleEditSearch}>
            Edit Search
          </button>
        </div>
      );
    }

    return (
      <div className="search-controls-container clearfix">
        <form className="row" onSubmit={this.handleSubmit}>
          <div className="columns medium-3-5">
            <label htmlFor="street-city-state-zip" id="street-city-state-zip-label">
              Search near
            </label>
            <input
              id="street-city-state-zip"
              name="street-city-state-zip"
              type="text"
              onChange={this.handleQueryChange}
              value={currentQuery.searchString}
              title="Your location: Street, City, State or Zip"/>
          </div>
          <div className="columns medium-3-5">
            <FacilityTypeDropdown
              facilityType={this.props.currentQuery.facilityType}
              onChange={this.handleFacilityTypeChange}/>
          </div>
          <div className="columns medium-3-4">
            {this.renderServiceTypeDropdown()}
          </div>
          <div className="columns medium-1-2">
            <input type="submit" value="Search"/>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchControls;
