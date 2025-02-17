/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { Divider, RoundButton, Icon } from '../../../../common/components'
import LabeledInput, { Label, Input } from './LabeledInput'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonRow = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 15px;
  ${props => props.hidden && 'opacity: 0;'} transition: none;
`

const MiniInput = Input.extend`
  width: 65%;

  @media screen and (max-width: 850px) {
    width: 65%;
  }
`

type Props = {
  highlights: Array<?string>,
  volunteering: boolean,
  index: number,
  addHighlight: (index: number) => void,
  removeHighlight: (index: number) => void
}

function Job({ highlights, index, addHighlight, removeHighlight, volunteering }: Props) {
	const description = volunteering ? 'Volunteering' : 'Job';
	const dataPrefix = volunteering ? 'volunteering' : 'work';
  return (
    <div>
      {index > 0 ? <Divider /> : null}
      <LabeledInput
        name={`${dataPrefix}[${index}].company`}
        label="Company Name"
        placeholder={volunteering ? 'Doctors Without Borders' : 'Google'}
      />
      <LabeledInput
        name={`${dataPrefix}[${index}].position`}
        label={`${description} Title`}
        placeholder="Software Engineer"
      />
      <LabeledInput
        name={`${dataPrefix}[${index}].location`}
        label={`${volunteering ? '' : 'Job'} Location`}
        placeholder="Mountain View, CA"
      />
      <LabeledInput
        name={`${dataPrefix}[${index}].startDate`}
        label="Start Date"
        placeholder="May 2015"
      />
      <LabeledInput
        name={`${dataPrefix}[${index}].endDate`}
        label="End Date"
        placeholder="May 2017 / Present / Etc."
      />
      <Label>{volunteering ? 'Volunteering' : 'Job'} Responsibilities</Label>
      {highlights.map((highlight, i) => (
        <Row key={i}>
          <MiniInput
            type="text"
            name={`${dataPrefix}[${index}].highlights[${i}]`}
            placeholder="Did cool stuff at company"
            component="input"
          />
          <ButtonRow hidden={i !== highlights.length - 1}>
            <RoundButton
              inverted
              disabled={i !== highlights.length - 1}
              type="button"
              onClick={() => addHighlight(index)}
            >
              <Icon type="add" />
            </RoundButton>
            <RoundButton
              inverted
              disabled={highlights.length === 1}
              type="button"
              onClick={() => removeHighlight(index)}
            >
              <Icon type="remove" />
            </RoundButton>
          </ButtonRow>
        </Row>
      ))}
    </div>
  )
}

export default Job
