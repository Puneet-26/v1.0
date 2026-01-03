'use client';

import { useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { logActivityAndGetTips } from '@/lib/actions';
import { useFootprintData } from '@/lib/hooks/use-footprint-data';
import { useToast } from '@/hooks/use-toast';
import type { FootprintRecord } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubmitButton } from '@/components/ui/submit-button';
import { Car, Zap, Leaf, Home, Trash2 } from 'lucide-react';

const initialState = { message: '', errors: {} };

export default function ActivityForm() {
    const [state, formAction] = useActionState(logActivityAndGetTips, initialState);
    const { addRecord } = useFootprintData();
    const { toast } = useToast();
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.message) {
          if (state.data) {
            toast({ title: 'Success', description: state.message });
            const newRecord: FootprintRecord = {
              id: new Date().toISOString(),
              date: new Date().toISOString(),
              activity: state.data.activity,
              emissions: state.data.emissions,
              tips: state.data.tips,
            };
            addRecord(newRecord);
            formRef.current?.reset();
            router.push('/');
          } else if (state.errors) {
            toast({ variant: 'destructive', title: 'Validation Error', description: 'Please check the form for errors.' });
          } else {
            toast({ variant: 'destructive', title: 'Error', description: state.message });
          }
        }
    }, [state, addRecord, router, toast]);

    return (
        <form ref={formRef} action={formAction} className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2"><Car size={20}/> Transport</h3>
                <div className="space-y-2">
                    <Label htmlFor="driveDistance">Car travel (km/week)</Label>
                    <Input id="driveDistance" name="driveDistance" type="number" placeholder="e.g., 50" defaultValue={0} min="0" />
                    {state.errors?.driveDistance && <p className="text-sm text-destructive">{state.errors.driveDistance}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="publicTransportDistance">Public transport (km/week)</Label>
                    <Input id="publicTransportDistance" name="publicTransportDistance" type="number" placeholder="e.g., 20" defaultValue={0} min="0" />
                     {state.errors?.publicTransportDistance && <p className="text-sm text-destructive">{state.errors.publicTransportDistance}</p>}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2"><Home size={20}/> Home Energy</h3>
                <div className="space-y-2">
                    <Label htmlFor="electricityUsage">Electricity usage (kWh/week)</Label>
                    <Input id="electricityUsage" name="electricityUsage" type="number" placeholder="e.g., 70" defaultValue={0} min="0" />
                    {state.errors?.electricityUsage && <p className="text-sm text-destructive">{state.errors.electricityUsage}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="naturalGasUsage">Natural gas for heating (kWh/week)</Label>
                    <Input id="naturalGasUsage" name="naturalGasUsage" type="number" placeholder="e.g., 100" defaultValue={0} min="0" />
                    {state.errors?.naturalGasUsage && <p className="text-sm text-destructive">{state.errors.naturalGasUsage}</p>}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2"><Leaf size={20}/> Food</h3>
                <div className="space-y-2">
                    <Label htmlFor="diet">Primary Diet</Label>
                    <Select name="diet" defaultValue="balanced">
                        <SelectTrigger id="diet">
                            <SelectValue placeholder="Select your diet type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="meat-heavy">Meat Heavy</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                        </SelectContent>
                    </Select>
                    {state.errors?.diet && <p className="text-sm text-destructive">{state.errors.diet}</p>}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2"><Trash2 size={20}/> Waste</h3>
                <div className="space-y-2">
                    <Label htmlFor="wasteAmount">General waste produced (kg/week)</Label>
                    <Input id="wasteAmount" name="wasteAmount" type="number" placeholder="e.g., 5" defaultValue={0} min="0" />
                    {state.errors?.wasteAmount && <p className="text-sm text-destructive">{state.errors.wasteAmount}</p>}
                </div>
            </div>
            
            <SubmitButton>Calculate & Get Tips</SubmitButton>
        </form>
    );
}
