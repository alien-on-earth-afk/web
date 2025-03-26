
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '@/components/shared/PageBanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash, MinusCircle, PlusCircle, ShoppingCart, CreditCard, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useRevealOnScroll } from '@/lib/animations';

const CartPage = () => {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const { ref, isVisible } = useRevealOnScroll();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === 'webark10') {
      const discountAmount = totalPrice * 0.1;
      setDiscount(discountAmount);
      
      toast({
        title: "Promo code applied!",
        description: "10% discount has been applied to your order.",
        duration: 3000,
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is invalid or expired.",
        variant: "destructive",
        duration: 3000,
      });
    }
    
    setPromoCode('');
  };
  
  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "This is a demo. In a real app, you would be redirected to a payment gateway.",
      duration: 3000,
    });
  };
  
  // Helper function to get the item display name
  const getItemName = (item: any) => item.name || item.title || 'Unnamed Product';
  
  return (
    <>
      <PageBanner
        title="Shopping Cart"
        subtitle="Review and manage your selected services"
        backgroundImage="/images/cart-banner.jpg"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Your Cart ({items.length} items)</h2>
                
                <div 
                  //@ts-ignore - ref is correctly typed in the hook
                  ref={ref}
                  className={`transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          <div className="md:col-span-2 p-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={getItemName(item)}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">{getItemName(item)}</h3>
                                <p className="text-sm text-muted-foreground">Service Package</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:col-span-1 p-4 flex items-center justify-center">
                            <div className="flex items-center">
                              <button 
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                <MinusCircle size={20} />
                              </button>
                              <span className="mx-3 w-8 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                <PlusCircle size={20} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="md:col-span-1 p-4 flex items-center justify-center">
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                          
                          <div className="md:col-span-1 p-4 flex items-center justify-center">
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash size={20} />
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-8">
                    <Button 
                      variant="outline" 
                      className="text-muted-foreground"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                    
                    <Link to="/services">
                      <Button variant="outline">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="bg-muted/40">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                          <span>Discount (10%)</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <Separator />
                      
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${(totalPrice - discount).toFixed(2)}</span>
                      </div>
                      
                      <div className="pt-4">
                        <label className="block text-sm font-medium mb-2">
                          Promo Code
                        </label>
                        <div className="flex space-x-2">
                          <Input
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Enter code"
                          />
                          <Button 
                            variant="outline" 
                            onClick={handlePromoCode}
                            disabled={!promoCode}
                          >
                            Apply
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Try "WEBARK10" for 10% off
                        </p>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button className="w-full" onClick={handleCheckout}>
                        <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <div className="mt-6">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Need Help?</h3>
                        <p className="text-sm text-muted-foreground">
                          Have questions about our services or need assistance with your order?
                        </p>
                        <Link to="/contact" className="text-sm text-primary hover:underline inline-flex items-center mt-2">
                          Contact our support team <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Looks like you haven't added any services to your cart yet. Explore our services to find solutions for your business needs.
              </p>
              <Link to="/services">
                <Button size="lg">
                  Browse Services
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CartPage;
