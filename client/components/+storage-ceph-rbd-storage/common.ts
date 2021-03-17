export interface CephParams {
    monitors: string,
    adminId: string,
    adminSecretValue: string,
    adminSecretNamespace: string,
    pool: string,
    userId: string,
    userSecretValue: string,
    fsType: string,
    imageFormat: string,
    imageFeatures: string
}

export const cephParams: CephParams = {
    monitors: "",
    adminId: "admin",
    adminSecretValue: "",
    adminSecretNamespace: "kube-system",
    pool: "",
    userId: "",
    userSecretValue: "",
    fsType: "ext4",
    imageFormat: "2",
    imageFeatures: "layering"
}