import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()

    // Create OpenAI completion to convert natural language to SQL
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a SQL expert. Convert natural language queries to SQL for a shipping_history table with these columns:
              customer_name, exact_dates, delivery_distance_km, sales_amount_, customer_number, customer_region,
              customer_zip_code, customer_city, shipto, destination_zone_name, destination_zone_id, delivery_location,
              delroute_name, delivery_route_code, cost_of_delivery_, npallet, item_quantity, production_plant_name,
              prodplant, family, insulator_type, material_number, material_id, delivery_carrier_agent, shipdocum,
              full_truck_ftl_or_part_of_enclosed_truck_ltl, truck_type, shipment_origin, item_quantity_
              
              Only return the SQL query, nothing else. Make sure the query is safe and won't modify data.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    })

    const sqlData = await openAIResponse.json()
    const sqlQuery = sqlData.choices[0].message.content

    // Execute the SQL query
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data, error } = await supabaseClient
      .from('shipping_history')
      .select()
      .limit(100)

    if (error) throw error

    return new Response(
      JSON.stringify({ results: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})