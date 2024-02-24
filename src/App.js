import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { useRoutes } from "react-router";
import "./App.css";
import routes from "./routes";
import { store } from "./store";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            light: "#8b87ff",
            main: "#706bf9",
            dark: "#706bf9",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
        },
    },
    typography: {
        allVariants: {
            fontFamily: "'Poppins', sans-serif !important",
        },
    },
});

function App() {
    const content = useRoutes(routes);

    return (
        <HelmetProvider>
            <Helmet titleTemplate="%s" defaultTitle="SSO" />
            <ThemeProvider theme={theme}>
                <Provider store={store}>{content}</Provider>
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;

// <Provider store={store}>
//         <ThemeProvider>
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/"
//                         element={
//                             <Landing />
//                         }
//                         children={
//                             [
//                                 {
//                                     path: "registry-dashboard/",
//                                     element: <RegistryDashboard />,
//                                 },
//                                 //--------- Channel Integrations --------------------
//                                 {
//                                     path: "pyramid",
//                                     element: <Pyramid />,
//                                 }, {
//                                     path: "add-org",
//                                     element: <AddOrganization />,
//                                 },
//                                 {
//                                     path: "add-tech-support",
//                                     element: <AddTechSupport />,
//                                 },
//                                 {
//                                     path: "dashboard",
//                                     element: <AllUnitDashboard />,
//                                 },
//                                 {
//                                     path: "app-list",
//                                     element: <AppList />,
//                                 },
//                             ]
//                         }
//                     />
//                     {/* <Route path="/registry-dashboard" element={<RegistryDashboard />} />
//                 <Route path="/pyramid" element={<Pyramid />} />
//                 <Route path="/add-org" element={<AddOrganization />} />
//                 <Route path="/add-tech-support" element={<AddTechSupport />} />
//                 <Route path="/dashboard" element={<AllUnitDashboard />} />
//                 <Route path="/app-list" element={<AppList />} /> */}

//                     {/* <Route path="/add-org-users" element={<AddOrgUsers />} /> */}
//                     <Route path="/add-units" element={<AddUnit />} />

//                     {/* <Route path="/consumer-unit" element={<AddConsumerUnit />} /> */}
//                     <Route path="/monitoring-unit" element={<AddMonitoringUnit />} />
//                 </Routes>
//             </BrowserRouter>
//         </ThemeProvider>
//     </Provider>
