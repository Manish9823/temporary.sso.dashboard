const localAppServerList = {
    process: {
        PORT: 8000,
        domain: "process.leadowsdev.in",
    },
    sms: {
        PORT: 9000,
        domain: "sms.leadowsdev.in",
    },
    whatsapp: {
        PORT: 9002,
        domain: "whatsapp.leadowsdev.in",
    },
    app3: {
        PORT: 9004,
        domain: "app2.leadowsdev.in",
    },
};

export const appServerPortNumberMapping = appKeyName => {
    if (!appKeyName) {
        return null;
    }

    if (localAppServerList.hasOwnProperty(appKeyName)) {
        return localAppServerList[appKeyName];
    }

    return null;
};
