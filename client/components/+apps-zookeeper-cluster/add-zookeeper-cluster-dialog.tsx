import React from "react";
import {observer} from "mobx-react";
import {Dialog, DialogProps} from "../dialog";
import {observable} from "mobx";
import {Wizard, WizardStep} from "../wizard";
import {Trans} from "@lingui/macro";
import {Notifications} from "../notifications";
import {EditForm} from '../common/edit-form';
import {
  defaultZookeeperCluster,
  ZookeeperCluster,
  zookeeperClusterApi
} from "../../api/endpoints/zookeeper-cluster.api";
import {RuleToMap} from "../common/rule";
import {AddZookeeperClusterRules} from "./zookeeper-cluster.rule";


interface Props extends Partial<DialogProps> {
}

@observer
export class AddZookeeperClusterDialog extends React.Component<Props> {

  @observable static isOpen = false;
  @observable static data: ZookeeperCluster = null;
  @observable resJson: ZookeeperCluster = null;
  private eleRef = React.createRef<EditForm>();

  static open() {
    AddZookeeperClusterDialog.isOpen = true;
  }

  static close() {
    AddZookeeperClusterDialog.isOpen = false;
  }

  close = () => {
    AddZookeeperClusterDialog.close();
  }

  createZookeeperCluster = async () => {

    try {
      console.log('resJson', this.eleRef.current.resJson);
      const zookeeperCluster: Partial<ZookeeperCluster> = {
        spec: this.resJson.spec,
      }
      if(typeof(zookeeperCluster.spec.replicas) == "string"){
        zookeeperCluster.spec.replicas = Number.parseInt(zookeeperCluster.spec.replicas)
      }
      let name = this.resJson.metadata.name;
      let namespace = this.resJson.metadata.namespace;
      await zookeeperClusterApi.create({name, namespace},zookeeperCluster)
          .then(()=>{
            Notifications.ok(
                <>Config save succeeded</>
            );
          })
      this.close();
    } catch (err) {
      Notifications.error(err);
    }
  }

  onOpen = async () => {
    console.log("data:",AddZookeeperClusterDialog.data)
    this.resJson = defaultZookeeperCluster as ZookeeperCluster
  }

  render() {
    const { ...dialogProps } = this.props;
    const header = <h5><Trans>Create ZookeeperCluster</Trans></h5>;
    let fieldRuleMap = RuleToMap(AddZookeeperClusterRules,"");
    console.log("fieldRuleMap:",fieldRuleMap)
    return (
      <Dialog
        {...dialogProps}
        className="AddZookeeperClusterDialog"
        isOpen={AddZookeeperClusterDialog.isOpen}
        onOpen={this.onOpen}
        close={this.close}
      >
        <Wizard header={header} done={this.close}>
          <WizardStep contentClass="flow column" nextLabel={<Trans>Create</Trans>} next={this.createZookeeperCluster}>
            <EditForm
              ref={this.eleRef}
              resJson={this.resJson}
              fieldRuleMap={fieldRuleMap}
            />
          </WizardStep>
        </Wizard>
      </Dialog>
    )
  }
}