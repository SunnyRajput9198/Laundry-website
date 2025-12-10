import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Loader2 } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertOrderSchema, laundryTypes, orderStatuses, type InsertOrder, type Order } from "@shared/schema";
import { Link } from "wouter";

interface CreateOrderProps {
  orderId?: string;
}

export default function CreateOrder(props: CreateOrderProps = {}) {
  const { orderId } = props;
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEditing = Boolean(orderId);

  const { data: existingOrder, isLoading: isLoadingOrder, isError: isOrderError, isSuccess: isOrderSuccess } = useQuery<Order>({
    queryKey: ["/api/orders", orderId],
    enabled: isEditing,
  });

  const form = useForm<InsertOrder>({
    resolver: zodResolver(insertOrderSchema),
    defaultValues: {
      customerName: "",
      phoneNumber: "",
      laundryType: "Wash",
      weight: 1,
      status: "Pending",
    },
  });

  useEffect(() => {
    const isValidOrder = existingOrder && typeof existingOrder === 'object' && 'id' in existingOrder && existingOrder.id;
    if (isValidOrder) {
      form.reset({
        customerName: existingOrder.customerName,
        phoneNumber: existingOrder.phoneNumber,
        laundryType: existingOrder.laundryType as InsertOrder["laundryType"],
        weight: existingOrder.weight,
        status: existingOrder.status as InsertOrder["status"],
      });
    }
  }, [existingOrder, form]);

  const createMutation = useMutation({
    mutationFn: (data: InsertOrder) => apiRequest("POST", "/api/orders", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({
        title: "Order created",
        description: "Your laundry order has been successfully placed.",
      });
      navigate("/orders");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create the order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: InsertOrder) => apiRequest("PUT", `/api/orders/${orderId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/orders", orderId] });
      toast({
        title: "Order updated",
        description: "The order has been successfully updated.",
      });
      navigate("/orders");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update the order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const hasValidOrder = existingOrder && typeof existingOrder === 'object' && 'id' in existingOrder && existingOrder.id;

  const onSubmit = (data: InsertOrder) => {
    if (isEditing && !hasValidOrder) {
      toast({
        title: "Error",
        description: "Cannot update order. Order data not loaded.",
        variant: "destructive",
      });
      return;
    }
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };
  const isFormReady = !isEditing || (isEditing && isOrderSuccess && hasValidOrder);
  const isPending = createMutation.isPending || updateMutation.isPending || !isFormReady;

  const orderNotFound = isEditing && !isLoadingOrder && !isOrderError && !hasValidOrder;
  
  if (isEditing && (isOrderError || orderNotFound)) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/orders">
          <Button variant="ghost" className="gap-2 mb-4" data-testid="button-back-error">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Button>
        </Link>
        <Card data-testid="card-error">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="font-medium text-lg mb-2">Order Not Found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The order you're trying to edit could not be found or has been deleted.
              </p>
              <Link href="/orders">
                <Button variant="outline" data-testid="button-back-to-orders">
                  Back to Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isEditing && isLoadingOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isEditing && !hasValidOrder) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/orders">
          <Button variant="ghost" className="gap-2 mb-4" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Button>
        </Link>
        <h1 className="text-2xl lg:text-3xl font-semibold" data-testid="text-page-title">
          {isEditing ? "Edit Order" : "Create New Order"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isEditing 
            ? "Update the details for this laundry order." 
            : "Fill in the details to place a new laundry order."}
        </p>
      </div>

      <Card data-testid="card-order-form">
        <CardHeader>
          <CardTitle>{isEditing ? "Order Details" : "New Order"}</CardTitle>
          <CardDescription>
            {isEditing 
              ? `Editing order #${orderId?.slice(0, 8)}` 
              : "Please provide the customer and order information below."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John Doe" 
                        {...field} 
                        data-testid="input-customer-name"
                      />
                    </FormControl>
                    <FormDescription>
                      Full name of the customer
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="+1 (555) 000-0000" 
                        {...field} 
                        data-testid="input-phone"
                      />
                    </FormControl>
                    <FormDescription>
                      Contact number for order updates
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="laundryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Laundry Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-laundry-type">
                          <SelectValue placeholder="Select laundry type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {laundryTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Type of laundry service required
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg) *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1"
                        min="0.1"
                        placeholder="2.5" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        data-testid="input-weight"
                      />
                    </FormControl>
                    <FormDescription>
                      Estimated weight of laundry in kilograms
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {orderStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Current status of the order
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <Link href="/orders" className="sm:flex-none">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="sm:flex-1"
                  data-testid="button-submit"
                >
                  {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isEditing ? "Update Order" : "Create Order"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
