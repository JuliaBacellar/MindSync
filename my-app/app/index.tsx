
// import { Stack } from "expo-router";
// import { Slot } from "expo-router";
// import React from "react";

// export default function MainLayout() {
//   return (
//     <Stack>
//       <Stack.Screen
//         name="screenOnboarding/onboarding"
//         options={{ headerShown: false }}
//       />
//       <Slot />
//     </Stack>
//   );
// }
// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/screenOnboarding/onboarding" />;
}
