import {BorderRadiuses, Typography, Spacings} from 'react-native-ui-lib';

BorderRadiuses.loadBorders({
  br10: 10,
  br20: 20,
  br30: 30,
});

Spacings.loadSpacings({
  card: 20,
});

Typography.loadTypographies({
  hotlable: { fontSize: 12 },
  lightHeading: { fontSize: 16 },
  boldHeading: { fontSize: 16, fontWeight: '600' },
  light: { fontWeight: '400' },
  bold: { fontWeight: '600' },
  h1: { fontSize: 32, fontWeight: '500'},
  h2: { fontSize: 24, fontWeight: '500'},
  h3: { fontSize: 20, fontWeight: '500'},
  h4: { fontSize: 18, fontWeight: '500'},
  h5: { fontSize: 16, fontWeight: '500'},
  h6: { fontSize: 14, fontWeight: '400'},
});
