import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface QueryResult {
  [key: string]: any;
}

export function QueryInterface() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<QueryResult[]>([]);
  const { toast } = useToast();

  const handleQuery = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a query",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('query-data', {
        body: { prompt },
      });

      if (error) throw error;

      setResults(data.results);
      toast({
        title: "Query executed successfully",
        description: `Found ${data.results.length} results`,
      });
    } catch (error) {
      console.error('Query error:', error);
      toast({
        title: "Error executing query",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="bg-[#2D3748] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">AI SQL Query Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Ask anything about your shipping data..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-[#1A1F2C] border-gray-700 text-white"
            />
            <Button 
              onClick={handleQuery} 
              disabled={isLoading}
              className="bg-[#805AD5] hover:bg-[#6B46C1]"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="bg-[#2D3748] border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow>
                    {Object.keys(results[0]).map((header) => (
                      <TableHead key={header} className="text-gray-300">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((row, i) => (
                    <TableRow key={i}>
                      {Object.values(row).map((value: any, j) => (
                        <TableCell key={j} className="text-gray-300">
                          {value?.toString() || "N/A"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}