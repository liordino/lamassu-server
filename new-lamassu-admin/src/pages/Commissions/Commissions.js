import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import * as R from 'ramda'
import React, { useState } from 'react'

import { Table as EditableTable } from 'src/components/editableTable'
import Section from 'src/components/layout/Section'
import TitleSection from 'src/components/layout/TitleSection'
import { fromNamespace, toNamespace, namespaces } from 'src/utils/config'

import {
  mainFields,
  overrides,
  schema,
  getOverridesSchema,
  defaults,
  overridesDefaults,
  getOrder
} from './helper'

const GET_DATA = gql`
  query getData {
    config
    cryptoCurrencies {
      code
      display
    }
    machines {
      name
      deviceId
    }
  }
`

const SAVE_CONFIG = gql`
  mutation Save($config: JSONObject) {
    saveConfig(config: $config)
  }
`

const Commissions = ({ name: SCREEN_KEY }) => {
  const [isEditingDefault, setEditingDefault] = useState(false)
  const [isEditingOverrides, setEditingOverrides] = useState(false)
  const { data } = useQuery(GET_DATA)
  const [saveConfig, { error }] = useMutation(SAVE_CONFIG, {
    refetchQueries: () => ['getData']
  })

  const config = data?.config && fromNamespace(SCREEN_KEY)(data.config)
  const currency = R.path(['fiatCurrency'])(
    fromNamespace(namespaces.LOCALE)(data?.config)
  )

  const commission = config && !R.isEmpty(config) ? config : defaults
  const commissionOverrides = commission?.overrides ?? []

  const orderedCommissionsOverrides = R.sortWith([
    R.ascend(getOrder),
    R.ascend(R.prop('machine'))
  ])(commissionOverrides)

  const save = it => {
    const config = toNamespace(SCREEN_KEY)(it.commissions[0])
    return saveConfig({ variables: { config } })
  }

  const saveOverrides = it => {
    const config = toNamespace(SCREEN_KEY)(it)
    return saveConfig({ variables: { config } })
  }

  const onEditingDefault = (it, editing) => setEditingDefault(editing)
  const onEditingOverrides = (it, editing) => setEditingOverrides(editing)

  return (
    <>
      <TitleSection title="Commissions" />
      <Section>
        <EditableTable
          error={error?.message}
          title="Default setup"
          rowSize="lg"
          titleLg
          name="commissions"
          enableEdit
          initialValues={commission}
          save={save}
          validationSchema={schema}
          data={R.of(commission)}
          elements={mainFields(currency)}
          setEditing={onEditingDefault}
          forceDisable={isEditingOverrides}
        />
      </Section>
      <Section>
        <EditableTable
          error={error?.message}
          title="Overrides"
          titleLg
          name="overrides"
          enableDelete
          enableEdit
          enableCreate
          groupBy={getOrder}
          initialValues={overridesDefaults}
          save={saveOverrides}
          validationSchema={getOverridesSchema(
            orderedCommissionsOverrides,
            data
          )}
          data={orderedCommissionsOverrides}
          elements={overrides(data, currency, orderedCommissionsOverrides)}
          setEditing={onEditingOverrides}
          forceDisable={isEditingDefault}
        />
      </Section>
    </>
  )
}

export default Commissions
