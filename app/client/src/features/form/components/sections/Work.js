/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import Section from './Section'
import { Button, Divider } from '../../../../common/components'
import LabeledInput from '../fragments/LabeledInput'
import { Job } from '..'
import {
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight,
  addVolunteering,
  removeVolunteering,
  addVolunteeringHighlight,
  removeVolunteeringHighlight
} from '../../actions'
import type { FormValues } from '../../types'
import type { State } from '../../../../app/types'

type Props = {
  work: $PropertyType<FormValues, 'work'>,
  volunteering: $PropertyType<FormValues, 'volunteering'>,
  jobCount: number,
  isVolunteering: boolean,
  jobHighlights: Array<number>,
  addJob: () => void,
  removeJob: () => void,
  addJobHighlight: (index: number) => void,
  removeJobHighlight: (index: number) => void
}

function Work({
  work,
  volunteering,
  isVolunteering,
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight,
  addVolunteeringHighlight,
  removeVolunteeringHighlight
}: Props) {
	const entries = isVolunteering ? volunteering : work;
  return (
    <Section heading={isVolunteering ? "Any volunteering work you have done" : "Your Work Experience"}>
      <LabeledInput
        name={`headings.${isVolunteering ? 'volunteering': 'work'}`}
        label="Section Heading"
        placeholder={isVolunteering ? "Volunteering" : "Work Experience"}
      />
      <Divider />
      {entries.map((job, i) => (
        <Job
		  key={i}
		  volunteering={isVolunteering}
          index={i}
          highlights={job.highlights}
          addHighlight={addJobHighlight}
          removeHighlight={removeJobHighlight}
        />
      ))}
      <Button onClick={addJob} type="button">
        Add {isVolunteering ? 'Volunteering' : 'Job'}
      </Button>
      <Button onClick={removeJob} disabled={work.length === 1} type="button">
        Remove {isVolunteering ? 'Volunteering' : 'Job'}
      </Button>
    </Section>
  )
}

function mapState(state: State) {
  return {
	work: state.form.resume.values.work,
	volunteering: state.form.resume.values.volunteering,
  }
}

const mapActions = {
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight,
  addVolunteering,
  removeVolunteering,
  addVolunteeringHighlight,
  removeVolunteeringHighlight
}

export default connect(mapState, mapActions)(Work)
