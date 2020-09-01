import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Stats from './Stats';
import Checkbox from '@material-ui/core/Checkbox';
import MultiValuedSelect from '../MultivaluedSelect';
import { skillsData } from '../../constants';

class Third extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: '',
      value: '',
      portfolio: null,
      education: '',
      selectedData: skillsData,
    };
  }
  handleTermsandconditions = (event) => {
    this.setState({
      checked: event.target.checked,
    });
    this.props.update('terms', event.target.checked);
  };
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
    this.props.update('type', event.target.value);
  };

  handleChangeEducation = (event) => {
    this.setState({
      education: event.target.value,
    });
    this.props.update('education', event.target.value);
  };
  updatePortfoliolink = (event) => {
    this.setState({
      portfolio: event.target.value,
    });
    this.props.update(event.target.name, event.target.value);
  };
  render() {
    const validate = () => {
      this.props.previousStep();
    };

    const { value, education, checked, selectedData } = this.state;
    return (
      <div>
        <div>
          <label>
            User type <span className="requiredColor">*</span>
          </label>{' '}
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="type"
              name="type"
              value={value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="Researcher"
                control={<Radio style={{ height: 10 }} />}
                label="Researcher"
              />
              <FormControlLabel
                value="Volunteer"
                control={<Radio style={{ height: 10 }} />}
                label="Volunteer"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <label>
            Education <span className="requiredColor">*</span>
          </label>
          <Select
            style={{ width: 500 }}
            id="education"
            value={education}
            onChange={this.handleChangeEducation}
          >
            <MenuItem value="Bachelors">Bachelors</MenuItem>
            <MenuItem value="Masters">Masters</MenuItem>
          </Select>
          <FormHelperText>Highest degree pursued!</FormHelperText>
        </div>
        <div>
          <label>
            Skills <span className="requiredColor">*</span>
          </label>
          <MultiValuedSelect
            name="skills"
            selectedData={selectedData}
            data={skillsData}
            updateForm={(key, value) => {
              console.log(value.toString());
              this.setState({
                selectedData: value,
              });
              this.props.update(key, value.toString());
            }}
          />
        </div>
        <div>
          <label>
            Portfolio link <span className="requiredColor">*</span>
          </label>
          <input
            required
            type="text"
            autoComplete="portfolio"
            className="form-control"
            name="portfolioLink"
            value={this.state.portfolio}
            placeholder="Portfolio link"
            onChange={this.updatePortfoliolink}
          />
        </div>
        <Checkbox
          defaultChecked
          checked={checked}
          onChange={this.handleTermsandconditions}
          size="small"
          inputProps={{ 'aria-label': 'checkbox with small size' }}
        />
        <label>
          <a
            href="https://www.northeastern.edu/privacy-information/"
            target="_blank"
            rel="noopener noreferrer"
          >
            I agree the the Skunka.ai EULA
          </a>
          <span className="requiredColor">*</span>
        </label>
        <Stats
          step={3}
          {...this.props}
          previousStep={validate}
          nextStep={() => this.props.register()}
        />
      </div>
    );
  }
}

export default Third;
