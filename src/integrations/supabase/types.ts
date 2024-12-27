export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      shipping_history: {
        Row: {
          cost_of_delivery_: number | null
          customer_city: string | null
          customer_name: string | null
          customer_number: string | null
          customer_region: string | null
          customer_zip_code: string | null
          delivery_carrier_agent: string | null
          delivery_distance_km: number | null
          delivery_location: string | null
          delivery_route_code: string | null
          delroute_name: string | null
          destination_zone_id: string | null
          destination_zone_name: string | null
          exact_dates: string | null
          family: string | null
          full_truck_ftl_or_part_of_enclosed_truck_ltl: string | null
          insulator_type: string | null
          item_quantity: number | null
          item_quantity_: number | null
          material_id: string | null
          material_number: string | null
          npallet: number | null
          prodplant: string | null
          production_plant_name: string | null
          sales_amount_: number | null
          shipdocum: string | null
          shipment_origin: string | null
          shipto: string | null
          truck_type: string | null
        }
        Insert: {
          cost_of_delivery_?: number | null
          customer_city?: string | null
          customer_name?: string | null
          customer_number?: string | null
          customer_region?: string | null
          customer_zip_code?: string | null
          delivery_carrier_agent?: string | null
          delivery_distance_km?: number | null
          delivery_location?: string | null
          delivery_route_code?: string | null
          delroute_name?: string | null
          destination_zone_id?: string | null
          destination_zone_name?: string | null
          exact_dates?: string | null
          family?: string | null
          full_truck_ftl_or_part_of_enclosed_truck_ltl?: string | null
          insulator_type?: string | null
          item_quantity?: number | null
          item_quantity_?: number | null
          material_id?: string | null
          material_number?: string | null
          npallet?: number | null
          prodplant?: string | null
          production_plant_name?: string | null
          sales_amount_?: number | null
          shipdocum?: string | null
          shipment_origin?: string | null
          shipto?: string | null
          truck_type?: string | null
        }
        Update: {
          cost_of_delivery_?: number | null
          customer_city?: string | null
          customer_name?: string | null
          customer_number?: string | null
          customer_region?: string | null
          customer_zip_code?: string | null
          delivery_carrier_agent?: string | null
          delivery_distance_km?: number | null
          delivery_location?: string | null
          delivery_route_code?: string | null
          delroute_name?: string | null
          destination_zone_id?: string | null
          destination_zone_name?: string | null
          exact_dates?: string | null
          family?: string | null
          full_truck_ftl_or_part_of_enclosed_truck_ltl?: string | null
          insulator_type?: string | null
          item_quantity?: number | null
          item_quantity_?: number | null
          material_id?: string | null
          material_number?: string | null
          npallet?: number | null
          prodplant?: string | null
          production_plant_name?: string | null
          sales_amount_?: number | null
          shipdocum?: string | null
          shipment_origin?: string | null
          shipto?: string | null
          truck_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
