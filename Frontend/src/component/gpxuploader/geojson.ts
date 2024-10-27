// GeoJSON 타입을 지정 (필요한 속성만 포함할 수 있음)
export interface GeoJSON {
  type: string;
  features: unknown[];
}
