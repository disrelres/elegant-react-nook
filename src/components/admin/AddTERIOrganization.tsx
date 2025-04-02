
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

// Define types based on the database schema
type ServiceType = Database["public"]["Enums"]["service_type"];
type DisabilityType = Database["public"]["Enums"]["disability_type"];

export const AddTERIOrganization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const addTERIOrganization = async () => {
    setIsLoading(true);
    setSuccess(false);
    setError("");

    try {
      // First, check if the organization already exists
      const { data: existingOrg } = await supabase
        .from('organizations')
        .select('id')
        .eq('name', 'TERI Road')
        .maybeSingle();

      if (existingOrg) {
        setError("TERI Road organization already exists in the database");
        setIsLoading(false);
        return;
      }

      // Insert the organization
      const orgId = crypto.randomUUID();
      const { error: insertError } = await supabase
        .from('organizations')
        .insert({
          id: orgId,
          name: 'TERI Road',
          description: "TERI Road's Independent Navigation and Driving Services program (INDS) provides assessment, training, and support services for individuals with disabilities to become independent community navigators and potential drivers.",
          website: 'https://teriroad.org/inds',
          phone: '(760) 721-1706',
          email: 'info@teriinc.org',
          is_national: false,
          city: 'Oceanside',
          state: 'CA',
          zip_code: '92056',
          organization_type: 'program'
        });

      if (insertError) {
        throw new Error(`Failed to insert organization: ${insertError.message}`);
      }

      // Associate with services - using properly typed service types
      const serviceTypes: ServiceType[] = [
        'transportation',
        'education_training',
        'assistive_technology'
      ];

      for (const serviceType of serviceTypes) {
        const { error: serviceError } = await supabase
          .from('organization_services')
          .insert({
            organization_id: orgId,
            service_type: serviceType
          });

        if (serviceError) {
          throw new Error(`Failed to associate service type ${serviceType}: ${serviceError.message}`);
        }
      }

      // Associate with disability types - using properly typed disability types
      const disabilityTypes: DisabilityType[] = [
        'cognitive_disability',
        'mobility_impairment'
      ];

      for (const disabilityType of disabilityTypes) {
        const { error: disabilityError } = await supabase
          .from('organization_disabilities')
          .insert({
            organization_id: orgId,
            disability_type: disabilityType
          });

        if (disabilityError) {
          throw new Error(`Failed to associate disability type ${disabilityType}: ${disabilityError.message}`);
        }
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-md border border-black">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-green-600 dark:text-green-400 font-['Verdana']">
          Add TERI Road Organization
        </CardTitle>
        <CardDescription className="font-['Verdana']">
          Add the TERI Road's Independent Navigation and Driving Services program to the database
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="mb-4 bg-green-50 border-green-500">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-700 font-['Verdana']">Success</AlertTitle>
            <AlertDescription className="text-green-700 font-['Verdana']">
              TERI Road organization has been successfully added to the database!
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert className="mb-4 bg-red-50 border-red-500">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertTitle className="text-red-700 font-['Verdana']">Error</AlertTitle>
            <AlertDescription className="text-red-700 font-['Verdana']">
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="font-semibold mb-2 font-['Verdana'] text-[#044bab]">Organization Details:</h3>
            <p className="mb-1 font-['Verdana']"><strong>Name:</strong> TERI Road</p>
            <p className="mb-1 font-['Verdana']"><strong>Description:</strong> TERI Road's Independent Navigation and Driving Services program (INDS) provides assessment, training, and support services for individuals with disabilities to become independent community navigators and potential drivers.</p>
            <p className="mb-1 font-['Verdana']"><strong>Website:</strong> https://teriroad.org/inds</p>
            <p className="mb-1 font-['Verdana']"><strong>Phone:</strong> (760) 721-1706</p>
            <p className="mb-1 font-['Verdana']"><strong>Email:</strong> info@teriinc.org</p>
            <p className="mb-1 font-['Verdana']"><strong>Location:</strong> Oceanside, CA 92056</p>
            <p className="mb-1 font-['Verdana']"><strong>Type:</strong> Program</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="font-semibold mb-2 font-['Verdana'] text-[#044bab]">Services:</h3>
            <ul className="list-disc list-inside font-['Verdana']">
              <li>Transportation</li>
              <li>Education & Training</li>
              <li>Assistive Technology</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="font-semibold mb-2 font-['Verdana'] text-[#044bab]">Disability Types:</h3>
            <ul className="list-disc list-inside font-['Verdana']">
              <li>Cognitive Disability</li>
              <li>Mobility Impairment</li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={addTERIOrganization} 
          disabled={isLoading || success}
          className="w-full bg-[#044bab] hover:bg-[#033b8a] text-white"
        >
          {isLoading ? "Adding..." : success ? "Added Successfully" : "Add to Database"}
        </Button>
      </CardFooter>
    </Card>
  );
};
