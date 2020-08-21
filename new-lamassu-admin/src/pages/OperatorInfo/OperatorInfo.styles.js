import typographyStyles from 'src/components/typography/styles'
import theme from 'src/styling/theme'
import { offColor } from 'src/styling/variables'

const { p } = typographyStyles

const styles = {
  header: {
    display: 'flex',
    '& > p': {
      marginTop: 0
    },
    '& > div': {
      marginLeft: 20,
      '& > button': {
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer'
      }
    }
  },
  section: {
    marginBottom: 52
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
    width: 600,
    '&:last-child': {
      marginBottom: 0
    }
  },
  switchRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 28,
    width: 600
  },
  switch: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 120
  },
  submit: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 19,
    padding: [[0, 4, 4, 4]],
    '& > button': {
      marginRight: 40
    }
  },
  singleButton: {
    marginTop: 50,
    paddingLeft: 0
  }
}

const contactInfoStyles = {
  infoMessage: {
    display: 'flex',
    marginBottom: 52,
    '& > p': {
      width: 330,
      color: offColor,
      marginTop: 4,
      marginLeft: 16
    }
  },
  radioButtonsRow: {
    height: 60,
    marginBottom: 14
  },
  radioButtons: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 4
  },
  rowWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    flex: 'wrap'
  },
  transparentButton: {
    '& > *': {
      margin: 'auto 12px'
    },
    '& button': {
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    }
  }
}

const termsConditionsStyles = {
  enable: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 22 - theme.spacing(1),
    '& > span:first-child': {
      extend: p,
      marginRight: 116 - theme.spacing(1)
    },
    '& > span:last-child': {
      marginLeft: 4
    }
  }
}

export { styles, contactInfoStyles, termsConditionsStyles }
