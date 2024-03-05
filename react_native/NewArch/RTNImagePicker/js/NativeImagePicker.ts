import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  pickImage(): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>('RTNImagePicker') as Spec | null;
