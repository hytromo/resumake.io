/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import Section from './Section'
import { Button, Divider } from '../../../../common/components'
import LabeledInput from '../fragments/LabeledInput'
import { Project } from '..'
import {
  addProject,
  removeProject,
  addPaper,
  removePaper,
  addProjectKeyword,
  removeProjectKeyword
} from '../../actions'
import type { FormValues } from '../../types'
import type { State } from '../../../../app/types'
import { titleCase } from '../../../../common/utils'

type Props = {
  projects: $PropertyType<FormValues, 'projects'>,
  papers: $PropertyType<FormValues, 'papers'>,
  isPapers: boolean;
  addProject: () => void,
  removeProject: () => void,
  addProjectKeyword: (index: number) => void,
  removeProjectKeyword: (index: number) => void
}

function Projects({
  projects,
  isPapers,
  papers,
  addProject,
  removeProject,
  addPaper,
  removePaper,
  addProjectKeyword,
  removeProjectKeyword
}: Props) {
	const description = isPapers ? 'papers' : 'projects';
	const entries = (isPapers ? papers: projects) || [];
  return (
    <Section heading={`Your ${isPapers ? 'Paper' : 'Project'}s`}>
      <LabeledInput
        name={`headings.${description}`}
        label="Section Heading"
        placeholder={titleCase(description)}
      />
      <Divider />
      {entries.map((entry, i) => (
        <Project
          key={i}
          index={i}
          keywords={entry.keywords}
          addKeyword={addProjectKeyword}
		  removeKeyword={removeProjectKeyword}
		  isPapers={isPapers}
        />
      ))}
      <div>
        <Button onClick={isPapers ? addPaper : addProject} type="button">
          Add {titleCase(description)}
        </Button>
        <Button
          onClick={isPapers ? removePaper : removeProject}
          disabled={entries.length === 1}
          type="button"
        >
          Remove {titleCase(description)}
        </Button>
      </div>
    </Section>
  )
}

function mapState(state: State) {
  return {
    projects: state.form.resume.values.projects,
    papers: state.form.resume.values.papers,
  }
}

const mapActions = {
  addProject,
  removeProject,
  addPaper,
  removePaper,
  addProjectKeyword,
  removeProjectKeyword
}

export default connect(mapState, mapActions)(Projects)
