import {Rule} from "../common/rule";


export const AddZookeeperClusterRules: Rule[] = [
    {
        name: "metadata",
        fieldRule:{
            require: true,
            verbose: "edit",
        },
        child:[
            {
                name: "name",
                fieldRule:{
                    require: true,
                    verbose: "edit",
                },
            }
        ]
    },
    {
        name: "spec",
        fieldRule:{
            require: true,
            verbose: "edit",
        },
        child: [
            {
                name: "replicas",
                fieldRule: {
                    require: true,
                    default: 3,
                    verbose: "edit"
                },
            },
            {
                name: "image",
                fieldRule: {
                    require: true,
                    verbose: "edit"
                },
                child: [
                    {
                        name: "repository",
                        fieldRule: {
                            require: true,
                            verbose: "edit"
                        },
                    },
                    {
                        name: "tag",
                        fieldRule: {
                            require: true,
                            verbose: "edit"
                        },
                    },
                ]
            },
            {
                name: "persistence",
                fieldRule: {
                    require: true,
                    verbose: "edit"
                },
                child:[
                    {
                        name: "reclaimPolicy",
                        fieldRule: {
                            require: true,
                            verbose: "edit"
                        },
                    },
                    {
                        name: "spec",
                        fieldRule: {
                            require: true,
                            verbose: "edit"
                        },
                        child:[
                            {
                                name: "resources",
                                fieldRule: {
                                    require: true,
                                    verbose: "edit"
                                },
                                child:[
                                    {
                                        name: "requests",
                                        fieldRule: {
                                            require: true,
                                            verbose: "edit"
                                        },
                                        child:[
                                            {
                                                name: "storage",
                                                fieldRule: {
                                                    require: true,
                                                    verbose: "edit"
                                                },
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
            },
        ],
    }
]

export const ConfigZookeeperClusterRules: Rule[] = [
    {
        name: "metadata",
        fieldRule:{
            require: true,
            verbose: "edit",
        },
        child:[
            {
                name: "name",
                fieldRule:{
                    require: true,
                    verbose: "view",
                },
            }
        ]
    },
    {
        name: "spec",
        fieldRule:{
            require: true,
            verbose: "edit",
        },
        child: [
            {
                name: "replicas",
                fieldRule: {
                    require: true,
                    default: 3,
                    verbose: "edit"
                },
            },
            {
                name: "image",
                fieldRule: {
                    require: true,
                    verbose: "view"
                },
                child: [
                    {
                        name: "repository",
                        fieldRule: {
                            require: true,
                            verbose: "view"
                        },
                    },
                    {
                        name: "tag",
                        fieldRule: {
                            require: true,
                            verbose: "view"
                        },
                    },
                ]
            },
        ],
    }
]